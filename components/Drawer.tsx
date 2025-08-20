import React, { useState } from 'react';
import { Button, DatePicker, DatePickerProps, Drawer, Input } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Dayjs } from 'dayjs';
type Inputs = {
  example: string
  exampleRequired: string
}

type DrawerButtonProps = {
  fetchProducts: () => void;
};

const DrawerButton: React.FC<DrawerButtonProps> = ({ fetchProducts }) => {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState("")
  const [date, selectedDate] = useState<string | null>(null)

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  console.log(watch("example"))
  const showDrawer = () => {
    setOpen(true);
  };
  //   const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const newEvent = {
  //     event,
  //     date,
  //   };

  //   console.log(newEvent);

  //   const stored = localStorage.getItem("events");
  //   const events = stored ? JSON.parse(stored) : [];
  //   events.push(newEvent);
  //     localStorage.setItem("events", JSON.stringify(events));


  // };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent = {
      event,
      date,
    };

    console.log("📤 Submitting:", newEvent);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      const result = await res.json();
      console.log(" Response:", result);
      fetchProducts()

      if (!res.ok) {
        alert(result.error || "Submission failed");
      } else {
        alert("Event submitted successfully!");
        setOpen(false)
      }
    } catch (error) {
      console.error("  error:", error);
      setOpen(false)
    } finally {
      setEvent("");
      selectedDate(null)
    }
  };


  const onClose = () => {
    setOpen(false);
  };
  const onChange: DatePickerProps<Dayjs>["onChange"] = (date, dateString) => {
    console.log("Selected date:", dateString);
    selectedDate(typeof dateString === "string" ? dateString : dateString?.[0] ?? null);
  }

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Add Event
      </Button>
      <Drawer
        title="Basic Drawer"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
      >
        <form>
          <Input onChange={(e) => setEvent(e.target.value)} value={event} />

          <DatePicker onChange={onChange} needConfirm />
          {errors.exampleRequired && <span>This field is required</span>}

          {/* <Input type="submit" value={"Submit"} /> */}
          <Button type="primary" onClick={handleSubmit}>
            Add Event
          </Button>
        </form>
      </Drawer>
    </>
  );
};

export default DrawerButton;