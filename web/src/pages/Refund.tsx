import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import fileSvg from '../assets/file.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Upload } from '../components/Upload';
import { CATEGORIES, CATEGORIES_KEYS } from '../utils/categories';

export function Refund() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filename, setFilename] = useState<File | null>(null);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (params.id) return navigate(-1);

    navigate('/confirm', { state: { fromSubmit: true } });
  }
  return (
    <form
      onSubmit={onSubmit}
      className="bg-customGray-500 w-full rounded-xl flex flex-col p-10 gap-6"
    >
      <header>
        <h1 className="text-xl font-bold text-customGray-100">
          Refund Solicitation
        </h1>
        <p className="text-sm text-customGray-200 mt-2 mb-4">
          Expense details for requesting refund
        </p>
      </header>
      <Input
        required
        legend="Solicitation Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!!params.id}
      />
      <div className="flex gap-4">
        <Select
          required
          legend="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={!!params.id}
        >
          {CATEGORIES_KEYS.map((category) => (
            <option key={category} value={category}>
              {CATEGORIES[category].name}
            </option>
          ))}
        </Select>

        <Input
          required
          legend="Value"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={!!params.id}
        />
      </div>

      {params.id ? (
        <a
          href=""
          target="_blank"
          className="text-sm text-customGreen-100 hover:opacity-70 transition ease-linear font-semibold flex items-center justify-center gap-2 my-6"
        >
          <img src={fileSvg} alt="file icon" className="h-5" />
          View Receipt
        </a>
      ) : (
        <Upload
          filename={filename && filename.name}
          onChange={(e) => e.target.files && setFilename(e.target.files[0])}
        />
      )}

      <Button type="submit" isLoading={isLoading}>
        {params.id ? 'Back' : 'Submit'}
      </Button>
    </form>
  );
}
