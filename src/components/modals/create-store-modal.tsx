"use client";

import { useModalStore } from "@/util/states/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import createNewStore from "@/actions/store-actions";
import { useRouter } from "next/navigation";
// 1. Define the validation schema with Zod based on the 'stores' table
export const storeFormSchema = z.object({
  storeName: z.string().min(3, {
    message: "Store name must be at least 3 characters.",
  }),
  storeDescription: z
    .string()
    .max(250, "Description must be 250 characters or less.")
    .optional(),
  logoImage: z
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")), // Allow empty string
  coverImage: z
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")), // Allow empty string
  isActive: z.boolean(),
});
const CreateStoreModal = () => {
  const { closeModal } = useModalStore();
  // 2. Set up the form using React Hook Form and the Zod resolver
  const form = useForm<z.infer<typeof storeFormSchema>>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      storeName: "",
      storeDescription: "",
      logoImage: "",
      coverImage: "",
      isActive: false,
    },
  });
  const router = useRouter();

  // Handling the form submit
  async function onSubmit(data: z.infer<typeof storeFormSchema>) {
    // TODO: Implement the database action here.
    // This function will eventually send the 'data' object to a server action or API route.
    try {
      console.log("Form data to be sent to backend:", data);
      toast.success("Store created successfully!", {
        description: "Your new store is now ready for setup.",
      });
      // In a real implementation, you would trigger a server action or API call here
      // For example:
      await createNewStore(data);

      // or
      // //
      //    await fetch("/api/seller/create-store", {
      //      method: "POST",
      //      body: JSON.stringify(data),
      //    });

      closeModal(); // Close the modal on successful submission
      router.refresh();
    } catch (error) {
      console.error("Failed to create store:", error);
      toast.error("Something went wrong", {
        description: "Could not create the store. Please try again.",
      });
    }
  }

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-gray-800">Create a New Store</h2>
      <p className="mt-2 text-sm text-gray-600">
        Fill out the details below to get your new store up and running.
      </p>

      {/* 4. Build the form with Shadcn UI components */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Rourkela Steel City Wares"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storeDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your store..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This will be displayed on your store&apos;s page. (Optional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logoImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/logo.png"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A direct link to your store&apos;s logo. (Optional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/cover.png"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A banner image for your store&apos;s page. (Optional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Activate Store</FormLabel>
                  <FormDescription>
                    Make your store visible to customers immediately after
                    creation.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create Store
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateStoreModal;
