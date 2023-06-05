import {v4} from 'uuid'

export class IdGenerator{
    public generator = (): string => {
        return v4()
    }
}