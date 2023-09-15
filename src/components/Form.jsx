import { useState } from "react";
import TextBox from "./TextBox";

export default function Form() {
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bmi, setBmi] = useState(0);

  const handleChange = (event, callBackFunction) => {
    let isNaN =
      Number.isNaN(event?.target?.value / 1) ||
      event?.target?.value === undefined;
    let value = Number(event?.target?.value);
    if (isNaN) {
      setTimeout(
        () => alert("ไม่สามารถคำนวณได้โปรดใส่ข้อมูลที่เป็นตัวเลขเท่านั้น!"),
        400
      );
      event.target.value = "";
    } else callBackFunction(value);
    if (height !== null && typeof height === "number")
      setHeight((val) => val / 100);
  };

  return (
    <>
      <form
        className="container"
        onSubmit={(e) => {
          e.preventDefault();
          setBmi(weight / height ** 2);
        }}
      >
        <div className="item">
          <input
            onChange={(e) => handleChange(e, setWeight)}
            type="text"
            placeholder="น้ำหนักของคุณในหน่วย (kg)"
            required
          />
          <input
            onChange={(e) => handleChange(e, setHeight)}
            type="text"
            placeholder="ส่วนสูงของคุณในหน่วย (cm)"
            required
          />
          <button type="submit">คำนวณ</button>
        </div>
      </form>
      <TextBox bmiValue={bmi}/>
    </>
  );
}
