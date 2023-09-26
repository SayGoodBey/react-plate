import { MARK_BOLD } from '@udecode/plate-basic-marks';
import { PlateLeaf, PlatePluginComponent, withProps } from '@udecode/plate-common';

export const createPlateUI = (
  overrideByKey?: Partial<Record<string, PlatePluginComponent>>,
  { draggable, placeholder }: { placeholder?: boolean; draggable?: boolean } = {},
) => {
  const components: Record<string, PlatePluginComponent> = {
    [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
  };

  // 支持业务段自定义
  if (overrideByKey) {
    Object.keys(overrideByKey).forEach((key) => {
      (components as any)[key] = (overrideByKey as any)[key];
    });
  }

  //   if (placeholder) {
  //     components = withPlaceholders(components);
  //   }
  //   if (draggable) {
  //     components = withDraggables(components);
  //   }

  return components;
};
