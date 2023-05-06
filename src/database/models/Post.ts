export class Post{
    constructor(
        private id: string,
        private creatorId: string,
        private content: string,
        private likes: number,
        private deslikes: number,
        private createdAt: string,
        private updateAt: string
    ){}

    public getId(): string{
        return this.id
    }

    public setId(value: string): void{
        this.id = value
    }
//------------------------------------------//

    public getCreatorId(): string{
        return this.creatorId
    }

    public setCreatorId(value: string): void{
        this.creatorId = value
    }
//------------------------------------------//

    public getContent(): string{
        return this.content
    }

    public setContent(value: string): void{
        this.content = value
    }
//------------------------------------------//

    public getLikes(): number{
        return this.likes
    }

    public setLikes(value: number): void{
        this.likes = value
    }
//------------------------------------------//

    public getDeslikes(): number{
        return this.deslikes
    }

    public setDeslikes(value: number): void{
        this.deslikes = value
    }
//------------------------------------------//

    public getCreatedAt(): string{
        return this.createdAt
    }

    public setCreatedAt(value: string): void{
        this.createdAt = value
    }
//------------------------------------------//

    public getUpdateAt(): string{
        return this.updateAt
    }

    public setUpdateAt(value: string): void{
        this.updateAt = value
    }
//------------------------------------------//
};