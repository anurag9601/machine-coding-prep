import data from "./data.json"

function suffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j: number = Math.floor(Math.random() * i);
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array;
}
export function handleGetData() {
    const imgData = data.map((e) => {
        return e.image
    });

    const finalData = suffle([...imgData, ...imgData]);

    //alternate to sort small amount of data
    // Math.floor(Math.random() -0.5);

    return finalData.map((imgURL, index) => {
        return {
            id: index,
            imgURL,
            turned: false
        }
    });
}