const colors: { [Key in Color]: string } = {
    black: "#333",
    white: "#fff",
    red: "#dc143c",
    blue: "#0068ee",
    grey: "#f6f6f6",
    none: "",
};
export default colors;

export type Color = "black" | "white" | "red" | "blue" | "grey" | "none";

export function hexToRgba(hex: string, alpha = 1): string {
    return "rgba(" + parseInt(hex.substring(1, 3), 16) + "," + parseInt(hex.substring(3, 5), 16) + "," + parseInt(hex.substring(5, 7), 16) + "," + alpha + ")";
}

export function colorToRgba(color: Color, alpha = 1): string {
    const hex = colors[color];
    return hexToRgba(hex, alpha);
}
