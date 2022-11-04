
export class HttpHelper {
    static DataListCreater<Type>(data: [Type]) {
        var result: Array<Type> = new Array<Type>()

        data.forEach((element: Type) => {
            return result.push(element);
        });
        return result
    }

    static async DataPostItems(url: string, data: {}){
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
    }

    static async DataCallItems<Type>(url: string, data: {}) {
        let result: Array<Type> = new Array<Type>()

        await fetch(url, {
            headers: {
                'method': 'post',
                'mode': 'no-cors',   
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Data' : JSON.stringify(data),
            }
        })
            .then(response =>  response.json())
            .then(data => result = this.DataListCreater<Type>(data))
            .catch(error => console.error('Unable to get items.', error));
        return result
    };
}
