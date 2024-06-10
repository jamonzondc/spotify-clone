import {Card} from "../../shared/view-models/card.type";
import {Observable} from "rxjs";

export type HomeSectionViewModel ={
  title:string;
  items$:Observable<Card[]>
}
