import React from "react";
import styles from "./Scroll.module.css";

interface dataTypes {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

const Scroll = () => {
  const [data, setData] = React.useState<dataTypes[] | []>([]);

  const cardContainer = React.useRef<HTMLDivElement | null>(null);

  async function fetData(): Promise<dataTypes[]> {
    return new Promise(async (response, reject) => {
      const request = await fetch("https://picsum.photos/v2/list?limit=10");

      const res: dataTypes[] = await request.json();

      if (res) {
        response(res);
      } else {
        reject("Data not found.");
      }
    });
  }

  React.useEffect(() => {
    fetData()
      .then((data) => {
        setData((prev) => {
          const updatedData = [...prev, ...data];
          return updatedData;
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  React.useEffect(() => {
    if (!cardContainer.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const enter = entries[0].isIntersecting;

        if (enter) {
          fetData()
            .then((data) => {
              setData((prev) => {
                const updatedData = [...prev, ...data];
                return updatedData;
              });
            })
            .catch((err) => {
              alert(err);
            });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    const lastEle = cardContainer.current.lastElementChild;

    console.log("lastEle", lastEle);
    if (lastEle) {
      observer.observe(lastEle);
    }
  }, [data]);

  console.log(data);

  return (
    <div className={styles.scrollContainer} ref={cardContainer}>
      {data.map((chunk, index) => (
        <img
          key={index}
          className={styles.card}
          src={chunk.download_url}
          alt="Image"
          height={400}
          width={300}
          loading="lazy"
        ></img>
      ))}
    </div>
  );
};

export default Scroll;
