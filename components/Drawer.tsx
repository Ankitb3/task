import React, { useState } from 'react';
import { Button, DatePicker, DatePickerProps, Drawer, Input } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Dayjs } from 'dayjs';
type Inputs = {
  example: string
  exampleRequired: string
}

const DrawerButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [event,setEvent] = useState("")
  const[date,selectedDate] = useState(null)

 const {
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch("example"))
  const showDrawer = () => {
    setOpen(true);
  };
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const newEvent = {
    event,
    date,
  };

  console.log(newEvent);

  const stored = localStorage.getItem("events");
  const events = stored ? JSON.parse(stored) : [];
  events.push(newEvent);
    localStorage.setItem("events", JSON.stringify(events));


};

  const onClose = () => {
    setOpen(false);
  };
  const onChange: DatePickerProps<Dayjs>["onChange"] = (date, dateString) => {
    console.log("Selected date:", dateString);
    selectedDate(dateString);
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
          <form onSubmit={handleSubmit}>
      {/* register your input into the hook by invoking the "register" function */}
      <Input  onChange={(e)=>setEvent(e.target.value)} value={event} />

      {/* include validation with required or other standard HTML validation rules */}
<DatePicker onChange={onChange} needConfirm />      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <Input type="submit" value={"Submit"}/>
    </form>
      </Drawer>
    </>
  );
};

export default DrawerButton;