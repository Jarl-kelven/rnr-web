export default function convertCurrency (value?: number) {
    if (!value || isNaN(value)) return "0";
    return `₦${value.toLocaleString()}`;
};