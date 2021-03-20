import { Component, OnInit } from '@angular/core';
import { ChildResultData } from '../models/child-result.model';
import { ChildService } from '../services/child.service';

@Component({
  selector: 'app-child-analysis',
  templateUrl: './child-analysis.component.html',
  styleUrls: ['./child-analysis.component.css']
})

export class ChildAnalysisComponent implements OnInit {

  constructor(public service: ChildService) { }
  typeData: string;

  childResultList: ChildResultData[];
  sectionTypeList: string[] = new Array();
  missionTypeList: string[] = new Array();

  selectedSection: string = 'All';
  selectedMission: string = 'All';

  childGraphList = new Array();

  ngOnInit(): void {
    this.service.refreshList();
  }

  setChild(id) {
    this.service.refreshListChildResult(id);
  }

  initSectionDropDown() {
    this.sectionTypeList.splice(0);
    this.service.childResultList.forEach(x => {
      if (this.sectionTypeList.indexOf(x.typeSection) == -1)
        this.sectionTypeList.push(x.typeSection);
    });

  }

  initMissionDropDown() {
    this.missionTypeList.splice(0);
    this.service.childResultList.forEach(x => {
      if ((this.selectedSection == 'All' || this.selectedSection == x.typeSection) &&
        this.missionTypeList.indexOf(x.typeMission) == -1) {
        this.missionTypeList.push(x.typeMission);
      }
    });
  }

  setSectionDropDown(sectionName: string) {
    this.selectedSection = sectionName;
    this.setMissionDropDown('All');
  }

  setMissionDropDown(missionName: string) {
    this.selectedMission = missionName;
    this.childResultList = this.service.childResultList;
    this.filterSection();
    this.filterMission();
    this.setGraphData();
  }

  filterSection() {
    if (this.selectedSection != 'All')
      this.childResultList = this.service.childResultList.filter(x => x.typeSection == this.selectedSection);
  }

  filterMission() {
    if (this.selectedMission != 'All')
      this.childResultList = this.childResultList.filter(x => x.typeMission == this.selectedMission);
  }

  setGraphData() {
    this.childGraphList.splice(0);

    var keys = new Array();
    var values = new Array();

    this.childResultList.forEach(x => {
      keys.push(x.typeSection + ',\n' + x.typeMission);
      values.push(x.percentResult);
    });

    var tempList = new Array();

    for (let index = 0; index < values.length; index++) {
      tempList.push({ "name": index.toString() + '(' + keys[index] + ')', "value": values[index] });
    }

    this.childGraphList = [
      {
        "name": "ChildResults",
        "series": [
          {
            "name": "",
            "value": 0
          }
        ]
      }
    ];

    this.childGraphList.splice(0);
    this.childGraphList.push({ "name": "ChildResults", "series": tempList });
    console.log(this.childGraphList);
  }

  setTypeAnalysis(typeData: string) {
    this.typeData = typeData;
  }
}