import { useState } from 'react';
import { usePetShop } from '@/contexts/PetShopContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { CalendarPlus } from 'lucide-react';
import { ServiceType } from '@/types';
import { appointmentSchema, AppointmentFormData } from '@/lib/validations';
import { ZodError } from 'zod';

interface AppointmentFormProps {
  onSuccess?: () => void;
}

const serviceOptions: { value: ServiceType; label: string }[] = [
  { value: 'bath', label: 'Banho' },
  { value: 'grooming', label: 'Tosa' },
  { value: 'veterinary', label: 'Consulta Veterinária' },
  { value: 'vaccination', label: 'Vacinação' },
  { value: 'consultation', label: 'Consulta Geral' },
];

export function AppointmentForm({ onSuccess }: AppointmentFormProps) {
  const { addAppointment, customers, getPetsByCustomerId } = usePetShop();
  const [formData, setFormData] = useState({
    customerId: '',
    petId: '',
    service: '' as ServiceType | '',
    date: '',
    time: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const customerPets = formData.customerId
    ? getPetsByCustomerId(formData.customerId)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToValidate = {
        customerId: formData.customerId,
        petId: formData.petId,
        service: formData.service || undefined,
        date: formData.date,
        time: formData.time,
        notes: formData.notes || undefined,
      };

      const validatedData = appointmentSchema.parse(dataToValidate);

      // TODO: Replace with API call when backend is ready
      // await appointmentApi.create(validatedData);
      addAppointment({
        petId: validatedData.petId,
        customerId: validatedData.customerId,
        service: validatedData.service,
        date: new Date(validatedData.date),
        time: validatedData.time,
        status: 'scheduled',
        notes: validatedData.notes || '',
      });

      toast.success('Agendamento criado com sucesso!');
      setFormData({
        customerId: '',
        petId: '',
        service: '',
        date: '',
        time: '',
        notes: '',
      });
      setErrors({});
      onSuccess?.();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Partial<Record<keyof AppointmentFormData, string>> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof AppointmentFormData;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        toast.error('Verifique os campos do formulário');
      } else {
        toast.error('Erro ao criar agendamento');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarPlus className="h-5 w-5 text-primary" />
          Novo Agendamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Cliente *</Label>
            <Select
              value={formData.customerId}
              onValueChange={(value) =>
                setFormData({ ...formData, customerId: value, petId: '' })
              }
            >
              <SelectTrigger className={errors.customerId ? 'border-destructive' : ''}>
                <SelectValue placeholder="Selecione o cliente" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.customerId && (
              <p className="text-sm text-destructive">{errors.customerId}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Pet *</Label>
            <Select
              value={formData.petId}
              onValueChange={(value) => setFormData({ ...formData, petId: value })}
              disabled={!formData.customerId}
            >
              <SelectTrigger className={errors.petId ? 'border-destructive' : ''}>
                <SelectValue placeholder={formData.customerId ? 'Selecione o pet' : 'Selecione um cliente primeiro'} />
              </SelectTrigger>
              <SelectContent>
                {customerPets.map((pet) => (
                  <SelectItem key={pet.id} value={pet.id}>
                    {pet.name} ({pet.species})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.petId && (
              <p className="text-sm text-destructive">{errors.petId}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Serviço *</Label>
            <Select
              value={formData.service}
              onValueChange={(value: ServiceType) =>
                setFormData({ ...formData, service: value })
              }
            >
              <SelectTrigger className={errors.service ? 'border-destructive' : ''}>
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.service && (
              <p className="text-sm text-destructive">{errors.service}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={errors.date ? 'border-destructive' : ''}
              />
              {errors.date && (
                <p className="text-sm text-destructive">{errors.date}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Horário *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={errors.time ? 'border-destructive' : ''}
              />
              {errors.time && (
                <p className="text-sm text-destructive">{errors.time}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aptNotes">Observações</Label>
            <Textarea
              id="aptNotes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Detalhes adicionais..."
              rows={3}
              className={errors.notes ? 'border-destructive' : ''}
            />
            {errors.notes && (
              <p className="text-sm text-destructive">{errors.notes}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Criando...' : 'Criar Agendamento'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
