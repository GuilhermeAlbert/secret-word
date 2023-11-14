export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isLoading?: boolean;
  endIcon?: React.SVGProps<SVGSVGElement>;
}
