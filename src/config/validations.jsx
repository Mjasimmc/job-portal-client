const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const phonePatttern = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
const regexURL = /^(https?:\/\/www\.|https?:\/\/|www\.)[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/;
export const validate = (type, value) => {
    if (type == 'name') {
        return value.trim().length > 0;
    } else if (type == 'email') {
        return emailPattern.test(value);
    } else if (type == 'phone') {
        return phonePatttern.test(value)
    } else if (type == 'password') {
        return passwordPattern.test(value);
    } else if (type == 'url') {
        return regexURL.test(value);
    } else {
        return false
    }
}