class api {
    async getAllHotels() {
        const response = await fetch('http://35.180.37.72:3001/hotels/');
        const json = await response.json();
        return json;
    }
}
export default new api();