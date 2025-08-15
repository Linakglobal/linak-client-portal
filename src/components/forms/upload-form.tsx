"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useClientStore } from "@/hooks/use-client-store";
import { uploadDocument } from "@/lib/supabase/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, File, Loader2, CheckCircle } from "lucide-react";

const uploadSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.length === 1, "Please select a file")
    .refine((files) => {
      const file = files?.[0];
      return file && file.size <= 10 * 1024 * 1024; // 10MB limit
    }, "File must be smaller than 10MB")
    .refine((files) => {
      const file = files?.[0];
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      return file && allowedTypes.includes(file.type);
    }, "Please select a valid file type (PDF, Image, Word, Excel)"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
});

type UploadFormData = z.infer<typeof uploadSchema>;

export function UploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { client, addDocument } = useClientStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const selectedFile = watch("file")?.[0];

  const onSubmit = async (data: UploadFormData) => {
    if (!client) {
      setError("Client information not found");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const file = data.file[0] as File;
      const document = await uploadDocument(client.id, file, data.description);

      if (document) {
        addDocument(document);
        setUploadSuccess(true);
        reset();

        // Redirect to documents page after 2 seconds
        setTimeout(() => {
          router.push("/documents");
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during upload";
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  if (uploadSuccess) {
    return (
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            Upload Successful!
          </h2>
          <p className="text-gray-600 mb-4">
            Your document has been uploaded successfully and is now being
            processed.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to documents page...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold">Upload Document</CardTitle>
        <p className="text-gray-600">
          Select a file and provide a description to upload your document
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <label htmlFor="file" className="text-sm font-medium text-gray-700">
              Select File
            </label>
            <div className="relative">
              <Input
                id="file"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.xls,.xlsx"
                className="border-2 border-dashed border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-20 cursor-pointer"
                {...register("file")}
              />
              {selectedFile && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <File className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      {selectedFile.name}
                    </span>
                    <span className="text-xs text-blue-700">
                      ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                </div>
              )}
            </div>
            {errors.file && (
              <p className="text-sm text-red-600">
                {errors.file.message as string}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Supported formats: PDF, Images (JPG, PNG, GIF), Word, Excel. Max
              size: 10MB
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Provide a brief description of the document..."
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isUploading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Your document will be securely stored and processed by our team
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
