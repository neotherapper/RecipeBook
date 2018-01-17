import { Injectable } from '@angular/core';
import { DocumentChangeAction } from 'angularfire2/firestore';

@Injectable()
export class FirebaseUtilsService {

  constructor() { }

  getDataAndIdFromDocument(actions: DocumentChangeAction[]): any {
    return actions.map(
      action => {
        return {
          id: action.payload.doc.id,
          ...action.payload.doc.data()
        };
      });
  }

}
