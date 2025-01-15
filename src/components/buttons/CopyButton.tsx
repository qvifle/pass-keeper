import Button from "@/ui/Button";
import PostClickTooltip from "@/ui/PostClickTooltip";
import copyToClipboard from "@/utils/copyToClipboard";
import { Copy } from "lucide-react";
import React, { HTMLAttributes } from "react";

interface CopyButtonProps extends HTMLAttributes<HTMLButtonElement> {
  copyValue: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ copyValue, ...rest }) => {
  return (
    <PostClickTooltip text={"Copied!"}>
      <Button
        size="icon"
        variant="primary"
        onClick={() => copyToClipboard(copyValue)}
        {...rest}>
        <Copy size={14} />
      </Button>
    </PostClickTooltip>
  );
};

export default CopyButton;
