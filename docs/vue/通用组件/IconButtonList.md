# IconButtonList

## 简介

`IconButtonList` 是一个通用的图标按钮列表组件，用于展示一组图标按钮。它支持自定义按钮样式、图标、点击事件等。

## Props

| 属性名 | 类型   | 默认值 | 说明             |
| ------ | ------ | ------ | ---------------- |
| buttonList | Array  | []     | 按钮数组         |
| buttonList[].icon | String | ''     | 按钮图标         |
| buttonList[].label | String | ''     | 按钮文本         |
| buttonList[].disabled | String | ''     | 是否禁用        |
| buttonList[].hidden | String | ''     | 是否隐藏         |

## Events

| 事件名 | 说明             |
| ------ | ---------------- |
| buttonList[].onClick  | 点击按钮时触发   |

## 使用方法

```vue
<template>
  <div>
    <IconButtonList :buttonList="buttonList"˝/>
  </div>
</template>

<script>
import IconButtonList from '@/components/IconButtonList.vue';

export default {
  components: {
    IconButtonList,
  },
  data() {
    return {
      buttonList: [
        {
          icon: 'icon1',
          label: '按钮1',
          onClick: () =>{}
          children: [
            {
              icon: 'icon1-1',
              label: '按钮1-1',
              onClick: () =>{}
            }
          ]
        },
        {
          icon: 'icon2',
          label: '按钮2',
          onClick: () =>{}
        },
        {
          icon: 'icon3',
          label: '按钮3',
          onClick: () =>{}
        },
      ],
    };
  },
  methods: {
  },
};
</script>
```

## 实现

```vue
<template>
    <div class="icon-button-list">
        <div class="icon-button-item" v-for="(item, index) in (buttonList.filter(i => !i.hidden))" :key="item.name"
            @click="() => !item.disabled && item.onClick(item, index)">
            <div :class="{ 'label-icon': true, 'disabled': item.disabled }">
                <svg-icon :name="item.icon" :color="item.disabled ? '#D4D4D4' : '#417efd'"></svg-icon>
                <span>{{ item.name }}</span>
            </div>
            <div v-if="!item.disabled && item.children && item.children.length" class="icon-button-children">
                <div class="icon-button-item-children" v-for="(item, index) in (item.children.filter(i => !i.hidden)) "
                    :key="item.name" @click.stop="() => !item.disabled && item.onClick(item, index)">
                    <div :class="{ 'label-icon': true, 'disabled': item.disabled }">
                        <svg-icon :name="item.icon" :color="item.disabled ? '#D4D4D4' : '#417efd'"></svg-icon>
                        <span>{{ item.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { color } from 'echarts';

export default {
    props: {
        buttonList: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="less" scoped>
.icon-button-list {
    padding: 4px 0px 4px 0px;
    display: flex;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    color: #666666;

    .icon-button-item {
        display: flex;
        align-items: center;
        padding: 2px;
        cursor: pointer;
        transition: all .3s;

        &:hover {
            background: #C5D8FF;
            border-radius: 2px;

            .icon-button-children {
                display: block;
            }
        }

        &:not(:first-child) {
            margin-left: 10px;
        }

        .icon-button-children {
            padding: 4px 0;
            position: absolute;
            top: 36px;
            z-index: 999;
            display: none;
            text-align: left;
            list-style-type: none;
            background-color: #fff;
            background-clip: padding-box;
            border-radius: 4px;
            outline: none;
            box-shadow: 0 2px 8px #00000026;
            transition: all .3s;
            transform: translate3d(0, 0, 0);

            .icon-button-item-children {
                width: 100%;
                white-space: nowrap;
                padding: 5px 12px;

                &:hover {
                    background: #C5D8FF;
                    border-radius: 2px;
                }
            }
        }

        .label-icon {
            display: flex;
            align-items: center;
        }

        .disabled {
            cursor: not-allowed;
            color: #BFBFBF;
        }
    }
}
</style>
```
