import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {InstrumentsService} from './instruments.service';
import {InstrumentModel} from '../models/instrument.model';

@Injectable()
export class InstrumentsFacade {
    constructor(private instrumentsService: InstrumentsService) {
    }

    getInstruments(): Observable<InstrumentModel[]> {
        return this.instrumentsService.getAll();
    }

    getInstrument(id: string): Observable<InstrumentModel> {
        return this.instrumentsService.getById(id);
    }

    add(instrument: InstrumentModel): Observable<Response> {
        return this.instrumentsService.add(instrument);
    }

    update(id: string, instrument: InstrumentModel): Observable<Response> {
        return this.instrumentsService.update(id, instrument);
    }

    delete(id: string): Observable<Response> {
        return this.instrumentsService.delete(id);
    }
}
