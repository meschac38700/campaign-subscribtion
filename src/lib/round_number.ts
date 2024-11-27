/**
 * Round the given number.
 * @param value number to round
 * @param decimals number of digits after the comma, default 2.
 */
export function round_number(value: number, decimals: number=1): number {
        const comma_variable = 10**decimals
        return Math.round((value + Number.EPSILON) * comma_variable) / comma_variable
}
