export const date_mock = new Date(1696341808797);
jest.useFakeTimers().setSystemTime(date_mock);

export const v4_mock = 'b08df94a-0ff3-42fa-ab36-24dfe76c95b2';
jest.mock('uuid', () => ({ v4: () => v4_mock }));
