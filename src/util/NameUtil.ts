const names = ['Gear', 'Hermy', 'Tom', 'Jack', 'Lily', 'Sedora', 'William']

export function randomName(): string {
    let index = Math.floor(Math.random() * names.length)     
    return names[index]
}