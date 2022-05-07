export class Task {
    _id: string
    title: string
    description: string
    category: string
    day: number
    month: string
    year: number

    constructor(_id: string, title: string, description: string, category: string, day: number, month: string, year: number) {
        this._id = _id
        this.title = title
        this.description = description
        this.category = category,
        this.day = day
        this.month = month
        this.year = year
    }
}