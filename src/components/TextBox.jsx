import { useState, useEffect } from "react";

/* eslint-disable react/prop-types */
const TextBox = ({ bmiValue }) => {
  const [bmi, setBmi] = useState(0);
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState(false);
  const [color , setColor] = useState('black');

  // Ref: https://www.khonkaenram.com/th/services/health-information/health-articles/med/program-bmi
  const createDescription = (value) => {
    if (value >= 30) {
      setLevel("คุณอ้วนมาก");
      setDescription(
        "ค่อนข้างอันตราย เสี่ยงต่อการเกิดโรคร้ายแรงที่แฝงมากับความอ้วน หากค่า BMI อยู่ในระดับนี้ จะต้องปรับพฤติกรรมการทานอาหาร และควรเริ่มออกกำลังกาย และหากเลขยิ่งสูงกว่า 40.0 ยิ่งแสดงถึงความอ้วนที่มากขึ้น ควรไปตรวจสุขภาพ และปรึกษาแพทย์"
      );
      setColor('red');
    } else if (value >= 25 && value <= 29.9) {
      setLevel("คุณอ้วน");
      setDescription(
        "อ้วนในระดับหนึ่ง ถึงแม้จะไม่ถึงเกณฑ์ที่ถือว่าอ้วนมาก ๆ แต่ก็ยังมีความเสี่ยงต่อการเกิดโรคที่มากับความอ้วนได้เช่นกัน ทั้งโรคเบาหวาน และความดันโลหิตสูง ควรปรับพฤติกรรมการทานอาหาร ออกกำลังกาย และตรวจสุขภาพ"
      );
      setColor('orange');
    } else if (value >= 18.6 && value <= 24) {
      setLevel("คุณน้ำหนักปกติ");
      setDescription(
        "น้ำหนักที่เหมาะสมสำหรับคนไทยคือค่า BMI ระหว่าง 18.5-24 จัดอยู่ในเกณฑ์ปกติ ห่างไกลโรคที่เกิดจากความอ้วน และมีความเสี่ยงต่อการเกิดโรคต่าง ๆ น้อยที่สุด ควรพยายามรักษาระดับค่า BMI ให้อยู่ในระดับนี้ให้นานที่สุด และควรตรวจสุขภาพทุกปี"
      );
      setColor('green');
    } else if (value <= 18.5) {
      setLevel("คุณผอมเกินไป");
      setDescription(
        "น้ำหนักน้อยกว่าปกติก็ไม่ค่อยดี หากคุณสูงมากแต่น้ำหนักน้อยเกินไป อาจเสี่ยงต่อการได้รับสารอาหารไม่เพียงพอหรือได้รับพลังงานไม่เพียงพอ ส่งผลให้ร่างกายอ่อนเพลียง่าย การรับประทานอาหารให้เพียงพอ และการออกกำลังกายเพื่อเสริมสร้างกล้ามเนื้อสามารถช่วยเพิ่มค่า BMI ให้อยู่ในเกณฑ์ปกติได้"
      );
      !!value && setColor('gray');
    }
    return value !== 0;
  };
  useEffect(() => {
    new Promise((res, rej) => {
      try{
        res(bmiValue);
      } catch(err){
        rej(new Error(`Error!\n${err}`))
      }
    })
      .then((result) => {
        setBmi(result);
        return result;
      })
      .then((result) => createDescription(result))
      .then((result) => setStatus(result))
      .catch((reason) => console.error(reason));
  }, [bmiValue]);

  return (
    <>
      <section className="show-bmi">
        <h3>ค่า BMI ของคุณคือ </h3>
        <h1 className="bmi">
            <p style={{color: color}}>{Number.isInteger(bmi) ? Math.trunc(bmi) : bmi.toFixed(2)}</p>
        </h1>
        <div className="show-description">
          {status ? (
            <>
              <h2 className="level" style={{color:color}}>{level}</h2>
              <p className="description">{description}</p>
            </>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

export default TextBox;
