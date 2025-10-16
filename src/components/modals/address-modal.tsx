"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useModalStore } from "@/util/states/modal";
import { addressFormSchema, AddressTypeEnum } from "@/util/types/address";
import { createAddress } from "@/actions/(public)/user";
import { useRouter } from "next/navigation";

// Here i will use shadcn ui card to create this form
export type AddressFormType = z.infer<typeof addressFormSchema>;

const AddressModal = () => {
  const form = useForm<AddressFormType>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      recipientName: "",
      lane1: "",
      lane2: "",
      landmark: "",
      city: "",
      state: "",
      country: "India",
      postalCode: "",
      phoneNumber: "",
      addressType: "Home", // default is set to home
      otherAddressType: "",
    },
  });
  const router = useRouter();

  // 2. Watch the 'addressType' field for changes.
  // This will cause the component to re-render whenever the user
  // changes the value of the addressType select dropdown.
  const watchAddressType = form.watch("addressType");
  const { closeModal } = useModalStore();

  const onSubmit = async (data: AddressFormType) => {
    try {
      console.log(`The address submitted is: `, data);
      await createAddress(data);
    } catch (err) {
      console.error(err);
    } finally {
      router.refresh();
      closeModal();
    }
  };

  return (
    <div>
      <Card className="border-0 focus:border-0 focus:outline-none focus:shadow-none shadow-none">
        <CardHeader>
          <CardTitle>Address</CardTitle>
          <CardDescription>Enter your new address</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Recipient Name */}
              <FormField
                control={form.control}
                name="recipientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Aarav Sharma" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*Lane 1*/}
              <FormField
                control={form.control}
                name="lane1"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Lane 1</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg. plot no 301, royal apartment"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {/* Lane 2 (Optional) */}
              <FormField
                control={form.control}
                name="lane2"
                render={({ field }) => {
                  //  when the value is null, it will replace it with ""
                  const value = field?.value ?? "";
                  return (
                    <FormItem>
                      <FormLabel>Lane 2 (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg. Near Apollo Hospital"
                          {...field}
                          value={value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {/* Landmark (Optional) */}
              <FormField
                control={form.control}
                name="landmark"
                render={({ field }) => {
                  const value = field.value ?? "";
                  return (
                    <FormItem>
                      <FormLabel>Landmark (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg. Opposite Ispat General Hospital"
                          {...field}
                          value={value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Rourkela" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* State */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Odisha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Postal Code */}
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="769001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flexitems-start  justify-between">
                {/* Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="United States">
                            United States
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex  gap-6">
                  <FormField
                    control={form.control}
                    name="addressType"
                    render={({ field }) => (
                      <FormItem className="row-span-1">
                        <FormLabel>Address Type</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Address Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Home">Home</SelectItem>
                            <SelectItem value="Work">Work</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {watchAddressType === "Other" && (
                    <FormField
                      control={form.control}
                      name="otherAddressType"
                      render={({ field }) => {
                        const value = field.value ?? "";
                        return (
                          <FormItem className="row-span-1">
                            <FormLabel>Other Address Type</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="eg. Friend"
                                {...field}
                                value={value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  )}
                </div>
              </div>{" "}
              {/* Phone Number (Optional) */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button className="" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddressModal;
