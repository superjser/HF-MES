import { MenuItem } from '@yoyo/theme';

// 全局的左侧导航菜单
export class AppMenus {
    static Menus = [
        // 首页
        new MenuItem(
            'HomePage',
            '',
            'anticon anticon-home',
            '/app/home'
        ),
        // 租户
        new MenuItem(
            'Tenants',
            'Pages.Tenants',
            'anticon anticon-team',
            '/app/tenants',
        ),
        // // 角色
        new MenuItem(
            'Roles',
            'Pages.Roles',
            'anticon anticon-safety',
            '/app/roles',
        ),
        // // 用户
        new MenuItem(
            'Users',
            'Pages.Users',
            'anticon anticon-user',
            '/app/users',
        ),
        // 关于我们
        new MenuItem(
            'About',
            '',
            'anticon anticon-info-circle-o',
            '/app/about',
        ),
      //企业模型
      new MenuItem('企业模型',
        '',
        'anticon anticon-user',
        '',
        [
        new MenuItem('集团', '', '', '/app/groups'),
        new MenuItem('企业', '', '', '/app/enterprises'),
        new MenuItem('车间', '', '', '/app/factories'),
        new MenuItem('产线', '', '', 'xx'),
        new MenuItem('产品', '', '', 'xx'),
        new MenuItem('工艺路径', '', '', 'xx'),
        new MenuItem('操作', '', '', 'xx')
      ]),
    ];
}
