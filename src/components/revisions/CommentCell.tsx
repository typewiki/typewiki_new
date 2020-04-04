import React from 'react';
import { CellProps, Renderer } from 'react-table';
import { Classes, Position, Tag, Tooltip } from '@blueprintjs/core';
import { useTranslation } from 'react-i18next';
import styles from './CommentCell.module.scss';

const CommentCell: Renderer<CellProps<any>> = ({ cell: { value, row } }) => {
  const { t } = useTranslation();
  const { tags, minor } = row.original;
  return (
    <span className={styles.container}>
      <span>
        <span
          dangerouslySetInnerHTML={{ __html: value }}
          style={{ marginRight: '.3em' }}
        />
        {minor && (
          <Tooltip
            className={Classes.TOOLTIP_INDICATOR}
            content={t('recentchanges-label-minor')}
            position={Position.BOTTOM_LEFT}
            usePortal={false}
          >
            <strong className={Classes.TEXT_SMALL} style={{ margin: 0 }}>
              {t('minoreditletter')}
            </strong>
          </Tooltip>
        )}
      </span>
      <span>
        {tags &&
          tags.map((tag: string, i: number) => (
            <Tag key={i} minimal interactive>
              {tag}
            </Tag>
          ))}
      </span>
    </span>
  );
};

export default CommentCell;
