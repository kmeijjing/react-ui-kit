import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
	cleanup(); // 매 테스트가 끝날 때마다 초기화
});
