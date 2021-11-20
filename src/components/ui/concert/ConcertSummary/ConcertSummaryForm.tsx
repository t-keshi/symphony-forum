import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useUpdateConcert } from '../../../../containers/controllers/concert/useUpdateConcert';
import { TextEditable } from '../../../helpers/TextEditable/TextEditable';
import { TextLabel } from '../../../helpers/TextLabel/TextLabel';

interface Props {
  orchestraName: string;
  title: string;
  description: string;
}

interface FormValues {
  title?: string;
  description?: string;
}

const schema = yup.object().shape({
  title: yup.string().min(1).max(30),
  description: yup.string().min(1).max(500),
});

export const ConcertSummaryForm: React.VFC<Props> = ({
  orchestraName,
  title,
  description,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const { mutate, isSuccess } = useUpdateConcert();
  const params: { concertId: string } = useParams();
  const onSubmit = handleSubmit((data) =>
    mutate({
      id: params.concertId,
      title: data.title,
      description: data.description,
    }),
  );

  return (
    <div>
      <TextLabel gutterBottom>{orchestraName}</TextLabel>
      <TextEditable
        control={control}
        onSubmit={onSubmit}
        name="title"
        defaultValue={title}
        margin="normal"
        errorMessage={errors.title?.message}
        isSuccess={isSuccess}
      />
      <TextEditable
        control={control}
        onSubmit={onSubmit}
        name="description"
        defaultValue={description}
        margin="normal"
        multiline
        rows={4}
        errorMessage={errors.description?.message}
        isSuccess={isSuccess}
      />
    </div>
  );
};
