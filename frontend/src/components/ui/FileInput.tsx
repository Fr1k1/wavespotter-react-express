import { Input } from "@/components/ui/input";

const FileInput = () => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Input id="picture" type="file" />
    </div>
  );
};

export default FileInput;
