import data from "./data.json"
export function handleGetData() {
    const imgData = data.map((e) => {
        return e.image
    });

    const finalData = [...imgData, ...imgData].sort(() => Math.random() - 0.5);

    return finalData.map((imgURL, index) => {
        return {
            id: index,
            imgURL,
            turned: false
        }
    });
}