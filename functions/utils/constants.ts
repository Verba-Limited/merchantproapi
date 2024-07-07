export const GENERATE_STRING = (length: number) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export const GENERATE_OTP_CODE = (length = 4) => {
    const chars = '0123456789';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return `B-${result}`;
}

export const GENERATE_RANDOM_PASSWORD = (length=14) => {
    var alphabet = [
        'abcdefghijklmnoqrstuvwxyz',
        'ABCDEFGHIJKLMNOQRSTUVWXYZ',
        '0123456789',
        '?<>!"£$%^&*()-+./'
    ];
      
    let password = '';
       
    for (var i = 0; i < length; i++) {
        var subset = alphabet[i%4];
        password += subset[Math.floor(Math.random() * subset.length)]
    }
    return password;
}

export const GENERATE_REFERENCE = (length = 14) => {
    const chars = 'ABCDEFGHIJKLMNOQRSTUVWXYZ0123456789';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return `${result.toLowerCase()}`;
}

export const GENERATE_BVN_NUMBER = (length = 11) => {
    const chars = '0123456789';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return `${result}`;
}

export const TODAYS_DATE = () => {
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

export const TODAYS_DAY = () => {
    var today = new Date();
    var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
    var dateTime = date.toString();
    return dateTime;
}

export const CURRENCY_INFO = (country: string) => {
    switch (country) {
        case 'Nigeria': 
            return {'currency': 'ngn', 'min': 50}
        case 'UK':
            return {'currency': 'pounds', 'min': 5}
        default:
            return {'currency': 'pounds', 'min': 5}
    }
}

export const INVITE_STATUS = [
    "accept",
    "decline"
]

export const STRING_INJECT = (str: any, arr: any) => {
    if (typeof str !== 'string' || !(arr instanceof Array)) {
        return false;
    }
    return str.replace(/({\d})/g, function(i) {
        return arr[i.replace(/{/, '').replace(/}/, '')];
    });
}

export const BILLS_CATEGORY = [ "VTU", "Electricity", "Schools", "Cable TV", "Internet Services", "Toll Service", "Govt Tax" ]

var unitmapping = {"days":24*60*60*1000,
                   "hours":60*60*1000,
                   "minutes":60*1000,
                   "seconds":1000};

function floor(value) {
    return Math.floor(value)
}

export const getTimeDiff = (startDate, endDate) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const milliseconds = Math.abs(end - start).toString()
    const seconds = parseInt(milliseconds) / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const time = Math.floor(days) + ":" + Math.floor(hours % 24) + ":" + Math.floor(minutes % 60) + ":" + Math.floor(seconds % 60);
    return time;
}

export const getMonthWord = (monthNumber) => {
    switch (monthNumber) {
        case 1:
            return 'January';
            break;
        case 2:
            return 'February';
            break;
        case 3:
            return 'March';
            break;
        case 4:
            return 'April';
            break;
        case 5:
            return 'May';
            break;
        case 6:
            return 'June';
            break;
        case 7:
            return 'July';
            break;
        case 8:
            return 'August';
            break;
        case 9:
            return 'September';
            break;
        case 10:
            return 'October';
            break;
        case 11:
            return 'November';
            break;
        case 12:
            return 'December';
            break;
        default:
            return 'NotFound';
            break;
    }
}

export const convertArrElementsToLower = (arr) => {
    return arr.map(el => {
        return el.toLowerCase();
    });
}

export const convertArrElementsToUpper = (arr) => {
    return arr.map(el => {
        return el.toUpperCase();
    });
}

export const GET_FIRST_N_DIGITS = (str: any, n: number) => {
    return str.slice(0, n);
    // return str.substring(0, n);
}

export const GET_LAST_N_DIGITS = (str: any, n: number) => {
    return str.slice(str.length - n);
}

export const CONVERT_IMAGE_URL_TO_BASE64 = async (url: string | URL | Request)  => {
    try {
      const response = await fetch(url);
      const blob = await response.arrayBuffer();
      const contentType = response.headers.get('content-type');
      const base64String = `data:${contentType};base64,${Buffer.from(blob,).toString('base64')}`;
      return base64String;
    } catch (err) {
      console.log(err);
    }
}  

export const IS_BASE64 = (str: any) => {
    return Buffer.from(str, 'base64').toString('base64') === str;
}

export const ACCEPTABLE_DOCUMENT_TYPE = [ "DRIVERS_LICENSE", "VOTERS_CARD", "PASSPORT", "NATIONAL_ID", "NIN_SLIP" ]


export const GEN_API_KEY = () => {
    //create a base-36 string that contains 30 chars in a-z,0-9
    return [...Array(30)]
      .map((e) => ((Math.random() * 36) | 0).toString(36))
      .join('');
};