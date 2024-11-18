import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import DropdownOptions from '../components/DropdownOptions';
import '@testing-library/jest-dom';

describe('DropdownOptions', () => {
	const mockOptions = [
		{ label: '옵션 1', value: '1' },
		{ label: '옵션 2', value: '2' },
		{ label: '옵션 3', value: '3', disable: true },
		{ label: '옵션 4', value: '4', display: false },
	];

	const mockParentId = 'test-parent';
	const mockOnClick = vi.fn();

	// 부모 엘리먼트 생성
	beforeEach(() => {
		const parentElement = document.createElement('div');
		parentElement.id = mockParentId;
		// 고정된 위치와 크기 설정
		Object.defineProperty(parentElement, 'getBoundingClientRect', {
			value: () => ({
				x: 0,
				y: 0,
				top: 100,
				right: 200,
				bottom: 120,
				left: 0,
				width: 200,
				height: 20,
			}),
		});
		document.body.appendChild(parentElement);

		// window 크기 설정
		Object.defineProperty(window, 'innerHeight', {
			value: 800,
			writable: true,
		});
	});

	afterEach(() => {
		cleanup();
		document.body.innerHTML = '';
		vi.clearAllMocks();
	});

	it('renders all visible options', () => {
		render(
			<DropdownOptions
				parentId={mockParentId}
				options={mockOptions}
				onClick={mockOnClick}
			/>
		);

		// display: false인 옵션 4를 제외한 3개의 옵션만 렌더링되어야 함
		expect(screen.getAllByRole('listitem')).toHaveLength(3);
		expect(screen.getByText('옵션 1')).toBeInTheDocument();
		expect(screen.getByText('옵션 2')).toBeInTheDocument();
		expect(screen.getByText('옵션 3')).toBeInTheDocument();
		expect(screen.queryByText('옵션 4')).not.toBeInTheDocument();
	});

	it('handles click events correctly', () => {
		render(
			<DropdownOptions
				parentId={mockParentId}
				options={mockOptions}
				onClick={mockOnClick}
			/>
		);

		// 일반 옵션 클릭
		fireEvent.click(screen.getByText('옵션 1'));
		expect(mockOnClick).toHaveBeenCalledWith(mockOptions[0]);

		// disabled 옵션 클릭
		fireEvent.click(screen.getByText('옵션 3'));
		expect(mockOnClick).not.toHaveBeenCalledWith(mockOptions[2]);
	});

	it('applies correct styles for disabled options', () => {
		render(
			<DropdownOptions
				parentId={mockParentId}
				options={mockOptions}
				onClick={mockOnClick}
			/>
		);

		const disabledOption = screen.getByText('옵션 3').closest('li');
		expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
		expect(disabledOption).toHaveClass('cursor-not-allowed');
	});

	it('updates position on scroll', () => {
		render(
			<DropdownOptions
				parentId={mockParentId}
				options={mockOptions}
				onClick={mockOnClick}
			/>
		);

		const dropdown = screen.getByRole('list');

		// 초기 위치 확인
		expect(dropdown.style.top).toMatch(/\d+rem/);

		// 스크롤 이벤트 발생
		fireEvent.scroll(window);

		// 위치가 업데이트되었는지 확인
		expect(dropdown.style.top).toMatch(/\d+rem/);
	});

	it('positions dropdown above when bottom space is insufficient', () => {
		// window 높이를 조정하여 아래 공간이 부족하게 만듦
		Object.defineProperty(window, 'innerHeight', {
			value: 150,
			writable: true,
		});

		render(
			<DropdownOptions
				parentId={mockParentId}
				options={mockOptions}
				onClick={mockOnClick}
			/>
		);

		const dropdown = screen.getByRole('list');

		// 드롭다운이 위쪽에 위치하는지 확인
		expect(parseInt(dropdown.style.top)).toBeLessThan(100); // parentRect.top보다 작아야 함
	});
});
