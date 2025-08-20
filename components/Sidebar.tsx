


"use client";
import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  LoadingOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps, Spin } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import DrawerButton from "./Drawer";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Events", "1", <PieChartOutlined />),
  getItem("Client", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };


  const handleDelete = async (id: string) => {

    try {
      setLoading(true)
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }
      setLoading(false)

      await fetchProducts();
    } catch (error) {
      alert("Error deleting item");
      console.error(error);
    } finally {
      setLoading(false)

    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return (
          <>
            <h2>📅 Events</h2>
            {events.length === 0 ? (
              <p>No events found.</p>
            ) : (
             
              loading ? <Spin spinning={loading} indicator={<LoadingOutlined spin />}/> : events.map((event: any, index) => (
                <>
                
                  <p key={index}>
                    <strong>{event.event}</strong> - {event.date}
                  </p>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </>

              ))
              )}
          </>
        );
      case "2":
        return (
          <>
            <h2>💻 Client Page</h2>
            <p>This is the client section content.</p>
          </>
        );
      case "3":
        return <p>User: Tom</p>;
      case "4":
        return <p>User: Bill</p>;
      case "5":
        return <p>User: Alex</p>;
      case "6":
        return <p>Team 1</p>;
      case "8":
        return <p>Team 2</p>;
      case "9":
        return <p>Files section</p>;
      default:
        return <p>Select an item from the menu</p>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[selectedKey]}
          mode="inline"
          items={items}
          onClick={({ key }) => setSelectedKey(key)}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} items={[{ title: "Dashboard" }, { title: selectedKey }]} />

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
            <DrawerButton fetchProducts={fetchProducts} />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SideBar;
