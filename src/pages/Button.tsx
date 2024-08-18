import SButton from "../components/SButton.tsx";
import { Setting24 } from "../assets/icons.tsx";

const Button = () => {
  return (
    <div>
      <div className="xs m-2">
        xs
        <SButton label="button" color="primary" size="xs" />
        <SButton label="button" color="positive" size="xs" rounded />
        <SButton label="button" color="negative" size="xs" />
        <SButton label="button" color="negative" size="xs" disabled />
      </div>
      <div className="sm m-2">
        sm
        <SButton label="button" color="primary" />
        <SButton label="button" color="primary" icon={Setting24} />
        <SButton label="button" color="positive" />
        <SButton label="button" color="negative" />
        <SButton label="button" color="negative" disabled />
      </div>
      <div className="md m-2">
        md
        <div>
          <SButton icon={Setting24} color="primary" size="md" />
          <SButton label="button" color="positive" size="md" />
          <SButton label="button" color="negative" size="md" />
          <SButton label="button" color="negative" size="md" disabled />
        </div>
        <div>
          <SButton label="button" color="primary" size="md" outlined />
          <SButton label="button" color="positive" size="md" outlined />
          <SButton
            label="button"
            color="negative"
            size="md"
            outlined
            icon={Setting24}
          />
          <SButton
            label="button"
            color="negative"
            size="md"
            outlined
            disabled
          />
        </div>
      </div>
      <div className="ls m-2">
        ls
        <SButton icon={Setting24} color="primary" size="lg" />
        <SButton label="button" color="positive" size="lg" />
        <SButton label="button" color="negative" size="lg" icon={Setting24} />
        <SButton label="button" color="negative" size="lg" disabled />
      </div>
      ;
    </div>
  );
};

export default Button;
