"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useModalStore } from "@/util/states/modal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// 1. Define the validation schema with Zod
export const sellerFormSchema = z.object({
  businessName: z.string().min(3, {
    message: "business name must be at least 3 characters.",
  }),
  phoneNumber: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit mobile number.",
  }),
  stripeAccountId: z.string().regex(/^[a-z]{2,10}_[a-zA-Z0-9]{14,255}$/, {
    message: "Please enter a valid stripe id",
  }),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Seller Terms of Service.",
  }),
});

const SellerApplicationModal = () => {
  const { closeModal } = useModalStore();

  // 2. Set up the form using React Hook Form and the Zod resolver
  const form = useForm<z.infer<typeof sellerFormSchema>>({
    resolver: zodResolver(sellerFormSchema),
    defaultValues: {
      businessName: "",
      phoneNumber: "",
      stripeAccountId: "",
      agreedToTerms: false,
    },
  });

  // 3. Define the submit handler
  async function onSubmit(data: z.infer<typeof sellerFormSchema>) {
    // In a real app, you would send this 'values' object to your backend API
    try {
      console.log("Submitting validated seller application:", data);
      const response = await fetch("/api/seller/create-account/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      // alert("Application submitted successfully! We will review it shortly.");
      toast("Application submitted successfully!", {
        description: "We will review it and reach to you shortly.",
      });
      closeModal(); // Close the modal on successful submission
    } catch (error) {
      if (error instanceof Error) {
        console.log("Some error happen", error.message);
      } else {
        console.log("Some unknown error has happened.");
      }
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Become a Seller</h2>
      <p className="mt-2 text-sm text-gray-600">
        Fill out the form below to start selling. All fields are required unless
        marked optional.
      </p>

      {/* 4. Build the form with Shadcn UI components */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Rourkela Handcrafts" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="10-digit mobile number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stripeAccountId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stripe Account Id</FormLabel>
                <FormControl>
                  <Input placeholder="valid stripe account id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreedToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I agree to the Seller Terms of Service</FormLabel>
                  <FormDescription>
                    You agree to our terms and conditions for selling on this
                    platform.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-blue-600">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SellerApplicationModal;
