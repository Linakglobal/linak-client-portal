import { UploadForm } from '@/components/forms/upload-form';

export default function UploadPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Document</h1>
        <p className="text-gray-600">
          Securely upload your documents for processing and review
        </p>
      </div>
      
      <UploadForm />
    </div>
  );
}
