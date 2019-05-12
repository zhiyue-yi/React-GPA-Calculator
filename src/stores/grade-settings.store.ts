import { observable, action, computed } from 'mobx';
import { IGradeSetting } from '../interfaces/grade-setting.interface';

export class GradeSettingsStore {
  @observable settings: IGradeSetting[] = [];

  @action addGradeSetting = (grade: string, point: number) => {
    const gradeSetting = { grade, point };
    this.settings.push(gradeSetting);
  };

  @action removeSetting = (gradeSetting: IGradeSetting) => {
    const index = this.settings.indexOf(gradeSetting);
    this.settings.splice(index, 1);
  };

  @computed get settingsInAscOrder() {
    const sortedSettings = [...this.settings];
    sortedSettings.sort((a, b) => (a.point > b.point ? 1 : -1));
    return sortedSettings;
  }

  getPoint(grade: string) {
    const setting = this.settings.find(s => s.grade === grade);
    return setting ? setting.point : 0;
  }

  @computed get count() {
    return this.settings.length;
  }
}

const gradeSettingStore = new GradeSettingsStore();

gradeSettingStore.addGradeSetting('A+', 5);
gradeSettingStore.addGradeSetting('A', 5);
gradeSettingStore.addGradeSetting('A-', 4.5);
gradeSettingStore.addGradeSetting('B+', 4);
gradeSettingStore.addGradeSetting('B', 3.5);
gradeSettingStore.addGradeSetting('B-', 3);
gradeSettingStore.addGradeSetting('C+', 2.5);
gradeSettingStore.addGradeSetting('C', 2);
gradeSettingStore.addGradeSetting('D+', 1.5);
gradeSettingStore.addGradeSetting('D', 1);
gradeSettingStore.addGradeSetting('P', 0);

export default gradeSettingStore;
