
export class HttpHelper {
    static DataListCreater<Type>(data: [Type]) {
        var result: Array<Type> = new Array<Type>()

        data.forEach((element: Type) => {
            return result.push(element);
        });
        return result
    }

    static async DataPostItems(url: string, data: {}){
        return await fetch(url, {
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
        await fetch(url)
            .then(response => response.json())
            .then(data =>  result = this.DataListCreater<Type>(data));
        return result
    };
}
