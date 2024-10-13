import { Input } from "@/components/ui/input";

const FileInput = ({ id }: { id: string }) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Input id={id} type="file" />
    </div>
  );
};

export default FileInput;
