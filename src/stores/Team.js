import { observable } from "mobx"

export class Team {
    @observable name
    @observable members
    @observable tasks = []

}