'use client';

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import z from 'zod'


export const changeEmailSchema = z.object({
    email: z.email("Invalid email address"),
});

export default function Page() {
    const [verificationSent, setVerificationSent] = useState(false);
    const [newEmail, setNewEmail] = useState('');

    const { handleSubmit, register, formState: { errors, isDirty } } = useForm({
        resolver: zodResolver(changeEmailSchema),
        defaultValues: {
            email: '',
        }
    });


    const submit = (data: { email: string }) => {
        console.log(data);
        setVerificationSent(true);
        setNewEmail('henrygad.orji@gmail.com');
    };


    return (
        <div className="animate-in fade-in duration-500 pb-20 space-y-8">
            <header className="flex items-center justify-between">
                <div className="flex gap-10 items-center">
                    <Link href="/dashboard/hotel-manager/settings" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ChevronLeft size={20} /> <Text className="font-bold">Back</Text>
                    </Link>
                    <Text variant="h3" className="text-2xl font-black">Change Email</Text>
                </div>
            </header>
            {
                !verificationSent ?
                    <form className='space-y-8' onChange={handleSubmit(submit)}>
                        <FormField label="Add new email" error={errors.email}>
                            <Input type="text" {...register('email')} />
                        </FormField>

                        <div>
                            <Button
                                className="rounded w-full px-8 font-black"
                                disabled={!isDirty}
                            >
                                Change email
                            </Button>
                        </div>
                    </form> :
                    <div className='flex justify-center items-center min-h-[50vh]'>
                        <Card className='p-4 space-y-0'>
                            <Text variant='h2' className='text-green-600 text-center'>Verification email sent!</Text>
                            <div className='space-y-2'>
                                <Text className='font-black'>We sent a verification link to <strong>{newEmail}</strong>.</Text>
                                <div />
                                <Text>Please check your inbox (and spam folder) and click the link to verify your new email address.</Text>
                            </div>

                            <div className='mt-4 space-y-1'>
                                <Button onClick={() => setVerificationSent(false)}>
                                    Change email again
                                </Button>
                                <div />
                                <Text className='text-xs text-red-700'>
                                    Didn’t receive the email? Check your spam folder or try resending later.
                                </Text>
                            </div>
                        </Card>

                    </div>
            }
        </div>
    )
};

function FormField({ label, children, error }: { label: string; children: React.ReactNode, error: FieldError | undefined }) {
    return (
        <div className="space-y-2">
            <Text className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 ml-1">{label}</Text>
            {children}
            {error && (
                <>
                    <div />
                    <Text className="text-xs text-red-500 font-bold pl-1">
                        {error.message}
                    </Text>
                </>
            )}
        </div>
    );
};