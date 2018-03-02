import { Injectable } from '@angular/core';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { PlannerService } from './planner.service';

@Injectable()
export class DragulaHandler {

  constructor(
    private dragulaService: DragulaService,
    private planner: PlannerService
  ) {
    dragulaService.setOptions('visits', {
      moves: function (el, container, handle) {
        return handle.tagName === 'app-visit-list';
      }
    });
  }

  // listenTo() {
  //   this.dragulaService.dropModel.subscribe((value) => {
  //     const element = value[1].id;
  //     const to = value[2].id;
  //     const from = value[3].id;

  //     if (from === to) {
  //       if (from === 'list-wrapper-container') {
  //         this.planner.shiftList(element);
  //       } else {
  //         this.planner.shiftCard(from, to, element);
  //       }
  //     } else {
  //       this.listService.shiftCard(from, to, element);
  //     }

  //   });
  //}
}