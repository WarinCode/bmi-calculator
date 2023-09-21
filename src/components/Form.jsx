import { useState } from "react";
import TextBox from "./TextBox";
import Swal from "sweetalert2";

export default function Form() {
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bmi, setBmi] = useState(0);

  const handleChange = (event, callBackFunction) => {
    let isNaN = Number.isNaN(event?.target?.value / 1) || event?.target?.value === undefined;
    let value = Number(event?.target?.value);
    if (isNaN) {
      setTimeout(
        () => 
        Swal.fire(
          'เกิดข้อผิดพลาดขึ้น!',
          'ต้องใส่เป็นตัวเลขเท่านั้น',
          'error'
        ),
        200
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
      <header>
        <h1 >เว็บไซต์คำนวณค่า BMI</h1>
      </header>
        <div className="item">
          <input
            onChange={(e) => handleChange(e, setWeight)}
            type="text"
            placeholder="น้ำหนักของคุณในหน่วย (kg)"
            required
            maxLength={5}
            minLength={2}
          />
          <input
            onChange={(e) => handleChange(e, setHeight)}
            type="text"
            placeholder="ส่วนสูงของคุณในหน่วย (cm)"
            required
            maxLength={5}
            minLength={2}
          />
          <button type="submit">คำนวณ</button>
          <button type="reset">ยกเลิก</button>
        </div>
      </form>
      <TextBox bmiValue={bmi}/>
    </>
  );
}
