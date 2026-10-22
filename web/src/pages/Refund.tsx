import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { z, ZodError } from 'zod';
import fileSvg from '../assets/file.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Upload } from '../components/Upload';
import { api } from '../services/api';
import { CATEGORIES, CATEGORIES_KEYS } from '../utils/categories';

const refundSchema = z.object({
  name: z.string().min(3, { error: 'Name must have at least 3 characters ' }),
  category: z.enum(CATEGORIES_KEYS),
  amount: z.coerce
    .number({ error: 'Inform a valid value' })
    .positive({ error: 'Inform a valid value higher than 0' }),
});

export function Refund() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (params.id) return navigate(-1);

    try {
      setIsLoading(true);

      if (!file) {
        alert('Receipt image is required');
      }

      const fileUploadForm = new FormData();
      fileUploadForm.append('file', file as Blob); // 'file' field is set in api upload configs

      const response = await api.post('/uploads', fileUploadForm);

      const data = refundSchema.parse({
        name,
        category,
        amount: amount.replace(',', '.'),
      });
      //console.log(data);

      await api.post('/refunds', {
        ...data,
        filename: response.data.filename,
      });

      navigate('/confirm', { state: { fromSubmit: true } });
    } catch (error) {
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }
      return alert('Failed to make a new solicitation');
    } finally {
      setIsLoading(false);
    }
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
          filename={file && file.name}
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
        />
      )}

      <Button type="submit" isLoading={isLoading}>
        {params.id ? 'Back' : 'Submit'}
      </Button>
    </form>
  );
}
