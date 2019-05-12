import { GradeSettingsStore } from './grade-settings.store';

describe('GPA Store', () => {
  it('adds new setting', () => {
    const store = new GradeSettingsStore();
    store.addGradeSetting('A', 5);
    store.addGradeSetting('A-', 4.5);

    expect(store.settings.length).toBe(2);
    expect(store.settings[1].grade).toBe('A-');
  });

  it('removes a setting', () => {
    const store = new GradeSettingsStore();
    store.addGradeSetting('A', 5);
    store.addGradeSetting('A-', 4.5);

    const settingToRemove = store.settings[0];
    store.removeSetting(settingToRemove);

    expect(store.settings.length).toBe(1);
    expect(store.settings[0].grade).toBe('A-');
  });

  it('returns setting list in ascending order', () => {
    const store = new GradeSettingsStore();
    store.addGradeSetting('A', 5);
    store.addGradeSetting('A-', 4.5);

    const settings = store.settingsInAscOrder;
    expect(settings[0].grade).toBe('A-');
    expect(settings[1].grade).toBe('A');
  });

  it('get correct point by given grade letter', () => {
    const store = new GradeSettingsStore();
    store.addGradeSetting('A', 5);
    store.addGradeSetting('A-', 4.5);

    const grade = store.getPoint('A-');
    expect(grade).toBe(4.5);
  });
});
