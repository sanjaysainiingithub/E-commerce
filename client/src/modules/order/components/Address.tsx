import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const addressSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(10, 'Phone is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(5, 'ZIP code is required'),
});

export function AddressForm({ onSubmit }: { onSubmit: (values: any) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register('name')} placeholder="Full Name" />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      
      <Input {...register('phone')} placeholder="Phone Number" />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      
      <Input {...register('street')} placeholder="Street Address" />
      {errors.street && <p className="text-red-500 text-sm">{errors.street.message}</p>}
      
      <Input {...register('city')} placeholder="City" />
      {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
      
      <Input {...register('state')} placeholder="State" />
      {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
      
      <Input {...register('zip')} placeholder="ZIP Code" />
      {errors.zip && <p className="text-red-500 text-sm">{errors.zip.message}</p>}

      <Button type="submit" className="w-full">Proceed to Payment</Button>
    </form>
  );
}