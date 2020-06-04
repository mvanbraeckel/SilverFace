
export default class Api {

    constructor(){
        this.personGroupId = 99999
        this.headers = {'Ocp-Apim-Subscription-Key': 'f09f2f2554ec4d6391f58cf4de9d589d', 'Content-Type': 'application/json'}
        this.url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0'
        this.accessToken = 'Bearer EwBAA+l3BAAUv0lYxoez7x2t6RowHa2liVeLW/wAAVETP88tfDrVv7QqARjGGuVJ5qr+/WD0HfmdM3fFru0CxLFkfDXO6WZ5YLKbVfLJS38O9Ohqt3H6+1snjAkxvkNrM2S8K9lXFQyhWhZxYCUVNmqwamYt9QaBLGKpWrWLhmV/vHoYg9DPmNnpEkiR/uZKcrUTXOuelgOCg81MsYuO5RGBxC8CmdPqfqe0Oj3U7MCPq1yTSB8Gjt/Htjx+Fq4fO7UTJpfP1LQgbZKGVSwimUsWd+QhunrygI3kpI+CCkJb9UyAY+BULrBT0OEr24XuSyMY/7XN82k0BbFDI8+TDcmB4l0SJZ2cNBWSBpz6eG93eLL4IcRIeyyhupIEDVEDZgAACPm6M4IPy+AzEAK9v9BWp/1wlK5Q3kdcn2pY7Ek1pbmSpZtZoQDo0aG6qrO7GTmTRJ4ogtJyQKJrRnFihu4G+EPOjhgt/ztcCYDPku+1hvXBRzXD1gLrHlRI4Nu5BKA1OOM8dIsrNkJz5hOMS+3aw+sl7inpcHByxs4D0bEFQ+uLUxh5L3rgok+RIXxzckHZ+ZY9jF5PPq1SZEq60ywABU7jVhw1wW2z28c+YFG4XhK6hl3uyMGsGm0rwxdtXB6JMD8mgVU5U8X0SEwDnMyj9Ruhr0Osq1u5SGQr9z5OavLPkg/BmhsxiPW19f8liD+ahEiIxcH7zNfrTJG8nXiRFpOrL88j7IN/tgo9d+Mlt51YZ/D+h/WmQC7UQAFAUwriI+i5Srvnm46qGLXAupw/gIAtsZp9917D/AquaVmIGV0RHIifdLjm6Rpb0O9xmtjfz/tg4EPRuV0EY41eF+SBFqwEXmKpqreGX3eTL3od2VrluOKYL0QrUgfF4O4YarUCMq/Tqg0q+eTDMK+AMqHXwjr2i2wEoFdYP96rkxYpOCqrYGSbd3RlSN60A9MPKQXUdFCvXP/qBh60rmWg7yrognjhywvgiKQFBXrexfbg1GiaG2xDvsuIRtnttqKXmwhHDYJDkJxWvz2HxU5710lZ73X4WR8QLVr7GF/Lc3fdSNFQByptSEGaCuuSDIQhnpGDKVpbASuZZjR2hthIAg==';
        
    } 

    sendMail = ( name, subject, data) => {
        const emails = {
            "Hi Jacob Haig": "jhaig343@gmail.com",
            "Hi Kamran Fekri": "fekri.kamran@gmail.com",
            "Hi Mitchell Van Braeckel": "mvanbrae@uoguelph.ca",
            "Hi Seegal Panchal": "djinnator1@gmail.com"
        }
        const endpoint = "https://outlook.office.com/api/v2.0/me/sendmail";
        const body = JSON.stringify({
            "Message": {
                "Subject": subject,
                "Body": {
                    "ContentType": "Text",
                    "Content": data
                },
                "ToRecipients": [
                    {
                        "EmailAddress": {
                            "Address": emails[name]
                        }
                    }
                ]
            },
            "SaveToSentItems": "false"
        });
        const headers = { 'Authorization': this.accessToken, 'Content-Type': 'application/json'};
        const method = 'post';

        return fetch(endpoint, {
            method,
            body,
            headers,
        })
        .then(response => console.log(response));
        
    }



    detectFace = (url) => {
        const endpoint = `${this.url}/detect`
        const body = JSON.stringify({ url })
        const headers = this.headers
        const method = 'post'

        return fetch(endpoint, {
            method,
            body,
            headers,
        })
        .then(response => response.json())
        .then(json => {
            if(json[0] !== undefined) {
                return json[0].faceId
            } else return null
        })
    }

    identifyFace = (faceId) => {
        const endpoint = `${this.url}/identify`
        const body = JSON.stringify({
            'personGroupId': this.personGroupId,
            'faceIds': [faceId],
            'maxNumOfCandidatesReturned': 1,
            'confidenceThreshold': 0.5
        })
        const headers = this.headers
        const method = 'post'

        return fetch(endpoint, {
            method,
            body,
            headers,
        })
        .then(response => response.json())
        .then(json => {
            if(json[0] !== undefined && json[0].candidates[0] !== undefined) {
                return json[0].candidates[0].personId
            } else return null
        })
    }

    getPersonName = (personId) => {
        const endpoint = `${this.url}/persongroups/${this.personGroupId}/persons/${personId}`
        const headers = this.headers
        const method = 'get'

        return fetch(endpoint, {
            method,
            headers,
        })
        .then(response => response.json())
        .then(json => {
            if(json !== undefined){
                return json.name
            } else return null
        })
    }

    uploadImage = (image) => {
        //console.log(image)
        const endpoint = 'https://api.imgur.com/3/image'
        const type = 'Base64'
        const body = JSON.stringify({
            image,
            type,
        })
        const headers = {
            Authorization: "Client-ID fea93584f138f1e",
            'Content-Type': "application/json"
        }
        const method = 'post'

        return fetch(endpoint, {
            method,
            body,
            headers,
        })
        .then(response => response.json())
        .then(json => {
            if(json.success){
                return json.data.link
            } else return null
        })       
    }

}