import User from "./User";

export default class Group {
  id: string;
  name: string;
  owner: User;
  numberOfPeople: number;
  imageUrl?: string;
  disabled: boolean;

  constructor(id: string, name: string, owner: User, numberOfPeople: number, imageUrl: string | undefined = undefined, disabled: boolean = false) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.numberOfPeople = numberOfPeople;
    this.imageUrl = imageUrl?.length !== 0 ? imageUrl : undefined;
    this.disabled = disabled;
  }
}
