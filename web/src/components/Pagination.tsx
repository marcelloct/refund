import firstSvg from '../assets/first.svg';
import lastSvg from '../assets/last.svg';
import nextSvg from '../assets/next.svg';
import previousSvg from '../assets/previous.svg';
import { Button } from './Button';

type Props = {
  current: number;
  total: number;
  onNext: () => void;
  onPrevious: () => void;
  onFirst: () => void;
  onLast: () => void;
};

export function Pagination({
  current,
  total,
  onNext,
  onPrevious,
  onFirst,
  onLast,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button variant="small" onClick={onFirst} disabled={current === 1}>
        <img src={firstSvg} alt="first page icon" className="h-5" />
      </Button>
      <Button variant="small" onClick={onPrevious} disabled={current === 1}>
        <img src={previousSvg} alt="previous icon" className="h-5" />
      </Button>
      <span className="text-sm text-customGray-200">
        {current} / {total}
      </span>
      <Button variant="small" onClick={onNext} disabled={current === total}>
        <img src={nextSvg} alt="next icon" className="h-5" />
      </Button>
      <Button variant="small" onClick={onLast} disabled={current === total}>
        <img src={lastSvg} alt="last page icon" className="h-5" />
      </Button>
    </div>
  );
}
